---
title: 'Building CatOS'
slug: 'building-catos'
date: '2024-03-14'
description: 'Building simple linux distro to show me a cat'
author: 'raj'
github: 'xrehpicx'
source: 'notion:f5e0574032de4923a35373b3816a2101'
cover: 'https://images.unsplash.com/photo-1570018144715-43110363d70a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
---

CatOS is a cat based OS

that shows you

```bash
    |\__/,|   (`\
  _.|o o  |_   ) )
-(((---(((--------
$_
```

## The plan

1. Build kernel.

2. Put this cat echo statement into the init that starts our user space.

3. Market this as the next big distro

## Build setup

To build the linux kernel we will be needing some set of dependencies.

Ill be doing this setup on an ubuntu server.

Our main build tools here will be:

- **gcc**: The GNU Compiler Collection; a compiler system supporting various programming languages, crucial for building software from source.

- **libncurses-dev**: Development files for the ncurses library, which provides an API for building text-based interfaces in a terminal-independent manner.

- **flex**: A tool for generating scanners: programs which recognize lexical patterns in text.

- **bison**: A general-purpose parser generator that converts a grammar description for an LALR(1) context-free grammar into a C program to parse that grammar.

- **bc**: An arbitrary precision numeric processing language, often used in scripts for its math capabilities.

- **libelf-dev**: Development files for the ELF file format library, useful for reading and manipulating ELF files (a common binary format for Unix and Unix-like systems).

- **libssl-dev**: Development files for the SSL/TLS cryptography library; necessary for developing applications that require secure communications.

- **make**: A tool which controls the generation of executables and other non-source files of a program from the program's source files.

We will also need some tools to deal with the filesystem post the compiling

- **bzip2**: A high-quality data compression program and library, often used for compressing files to save disk space or to make transferring files faster.

- **cpio**: A tool to manage archives of files, capable of creating and extracting files from various formats, including its own cpio format, tar, and others.

- **syslinux**: A suite of lightweight bootloaders, used for booting from FAT filesystems (such as those on USB sticks), network boot (PXE), and more.

- **dosfstools**: Utilities for making and checking MS-DOS FAT filesystems on Linux, useful for managing USB drives, SD cards, and similar storage formatted with FAT.

Install all the above with:

```bash
sudo apt-get install git gcc libncurses-dev flex bison bc libelf-dev libssl-dev make bzip2 cpio syslinux dosfstools
```

## Compiling Linux kernel

To start off u can clone the kernel repo from the github, you can also clone the kernel from `git://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git`

```bash
git clone --depth 1 https://github.com/torvalds/linux.git
cd linux
```

Once done we can use the menuconfig make script that the linux gods have made for us to configure the kernel params using a UI. This is why we installed **libncurses-dev**; if you have experience setting these up then this dependency can be removed.

```bash
make menuconfig
```

This will give you an amazing UI to help u pick configs, you can leave all of these to the default config and exit. _just make sure the 64bit option is selected in build options._

Now to start the build process you can run

```bash
make -j4
```

> The 4 here is the number of jobs that can run in parallel, you can just set this number to the number of cores on your machine to speed up the build process.

## Post compile setup

once the kernel build process is done we need to create the boot image, this will require more than just our kernel binary, so we’ll setup a folder for this, u can call this anything.

```bash
mkdir /boot-files
```

After the kernel build was done you should have a kernel binary called bzImage, cp this into our files dir that we just created

```bash
cp arch/x86/boot/bzImage /boot-files/
```

## Setting up initramfs

This will just be a basic file system that will be mounted in once the kernel boots up, we can use this to mount in some tools and utilities that would make this distro kind of useable, we will be using busybox for these set of utilities, but this is optional and this can just be a single init script that prints out the cat ascii too.

### Building busybox

go back out of ur linux dir and clone this.

```bash
git clone --depth 1 https://git.busybox.net/busybox
cd busybox
```

we will again use their menuconfig script for the setup

```bash
make menuconfig
make -j 4
```

Here they will give u a bunch of options, you can pick any but here we will not have much else so will be going with the static build

Once busybox build is done you can move this into our initramfs folder, and setting up the install config prefix to point to this folder.

```bash
mkdir /boot-files/initramfs
make CONFIG_PREFIX=/boot-files/initramfs install
cd /boot-files/initramfs/
```

And now finally the time has come

We can create our init script here that will show our cat

and also start our user shell

```bash
echo -e '#!/bin/sh\necho "    |\\__/|,|   (\`\\\n  _.|o o  |_   ) )\n-(((---(((--------"\n/bin/sh' > init
```

This will create a file called init, this will be our script and will have to have +x permissions.

```bash
chmod +x init
```

cuz we have our own init we can remove linuxrc

```bash
rm linuxrc
```

### Packaging our initramfs

We will package all our initramfs into a cpio file using our cpio utility

```bash
find . | cpio -o -H newc > ../init.cpio
cd ..
```

Now we have our filesystem with our cat ready.

## Creating boot file

To create our bootable linux system we will need to create a boot image with a bootloader installed in it.

1st we will create an empty boot file

```bash
dd if=/dev/zero of=boot bs=1M count=50
```

This command takes in zeros from /dev/zero which provides us with just NULL or 0x00 values that we can fill into anything we want lol

Here we are creating a 50MB file full of zeros

Now lets make it fat format so we can install our bootloader into it

```bash
mkfs -t fat boot
syslinux boot
```

syslinux boot installs our bootloader syslinux into our boot fs

now to move our kernel binary and our cat initramfs we just can mount this file and cp the files into it

```bash
mkdir m
mount boot m
cp bzImage init.cpio m

umount m
```

And thats it, we are done. we now have a bootable image.

we can now virsh boot this or boot this into a pi (you will need to build it on a pi for this), or use qemu.

Will update this about my testing on pi once i figure that out.
