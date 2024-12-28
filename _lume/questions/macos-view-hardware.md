---
category: questions
description: In which I remind myself how to view system specs in the terminal
output: src/content/questions
publish: true
slug: macos-view-hardware
tags:
  - hardware
  - macos
title: How can I find out more about the hardware inside my Mac?
---
While there's the classic `Apple menu -> About This Mac -> System Report`, a terminal based alternative is the `system_profiler` command.

You can use a list of queryable types like so:

```bash
> system_profiler -listDataTypes
Available Datatypes:
SPParallelATADataType
SPUniversalAccessDataType
[...]
```

Once you've found one or more types, you're interested in then just append it after the command like so: `system_profiler <type1> <type2>`

Let's see how it looks in action:

```bash
> system_profiler SPPowerDataType
Power:

    Battery Information:

      Model Information:
          Manufacturer: DSY
          Device Name: bq20z451
          Pack Lot Code: 0
          PCB Lot Code: 0
          Firmware Version: 1002
          Hardware Revision: 1
          Cell Revision: 2400
      Charge Information:
          Fully Charged: No
          Charging: Yes
          Full Charge Capacity (mAh): 4569
          State of Charge (%): 74
      Health Information:
          Cycle Count: 81
          Condition: Normal
```

This is just an excerpt of what is otherwise a whole bunch of information.

Particularly interesting is the `SPAirPortDataType` which can be queried to see a list of SSIDs in the environment.
