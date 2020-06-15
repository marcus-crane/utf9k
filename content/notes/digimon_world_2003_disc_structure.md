+++
title = "Digimon World 2003 Disc Structure"
author = ["Marcus Crane"]
lastmod = 2020-06-14T12:45:40+12:00
slug = "digimon_world_2003_disc_structure"
draft = false
+++

XA Discs start at a 37656 offset

The default header offset size is 2048 so you can find the table of contents by seeking 32768 bytes forward (2048 \* 16)

In the case of PS1 discs, they're 2352(?) so you need to seek forward by 2352 \* 16 = 37632. Add 24 to find that XA discs do start at 37656

Offset
Contents
Note
37656
Reserved System Area

1
\x01
Volume descriptor code 1 means Primary Volume Descriptor
5
CD001
Always CD001
1
\x01
Volume descriptor version (0x01)
1
\x00
Unused
32
PLAYSTATION
System Identifier (system that can act upon the starting sectors)
32
DMW3
The identifier of the disc
8
\x00\x00\x00\x00\x00\x00\x00\x00
Unused field
8
\x88}\x04\x00\x00\x04}\x88
Number of logical blocks that the volume is recorded in
32
\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00
Unused
4
\x01\x00\x00\x01
Volume set size
4
\x01\x00\x00\x01
Volume sequence number
4
\x00\x08\x08\x00
Logical block size
8
D\x05\x00\x00\x00\x00\x05D
Path table size
4
\x12\x00\x00\x00
Loc of Type L Table
4
\x13\x00\x00\x00
Optional L-Type table
4
\x00\x00\x00\x14
Type M table
4
\x00\x00\x00\x15
Optional Type M table
34
"\x00\x16\x00\x00\x00\x00\x00\x00\x16\x00\x08\x00\x00\x00\x00\x08\x00\x02\n\x01\x00\x00\x00$\x02\x00\x00\x01\x00\x00\x01\x01\x00
Dir entry for root directory
128

Volume set identifier
128
BANDAI
Publisher identifier
128
BANDAI
Data preparer identifier
128
PLAYSTATION
Application identifier
38
BANDAI
Copyright file identifier
36

Abstract info
37

Bibliographic info
17
2002100100000000$
Volume creation date
17
0000000000000000\x00
Volume modification date
17
0000000000000000\x00
Volume expiration date
1
0
Records and path table version
1
0
Unused
