---
category: questions
description: In which I remind myself what profiling is
slug: monitoring-what-is-profiling
tags:
  - instrumentation
  - monitoring
title: What is profiling?
---
An initial thought might be that it would help to capture all context about everything, all of the time but that would soon get very expensive to store.

Profiling takes the approach of capturing as much context as possible for a certain period of time, generally for use in debugging.

Continually gathering information, such as how long each function took to execute, in a production environment would very quickly impact end users so this is best suited for validating targeted assumptions of what might be going wrong.
