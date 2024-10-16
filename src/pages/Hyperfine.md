---
publish: "true"
---
# Hyperfine

[https://github.com/sharkdp/hyperfine](https://github.com/sharkdp/hyperfine)

A command line tool for benchmarking

## Examples

```shell
$ hyperfine 'sleep 0.3'
# run benchmarks X number of times
$ hyperfine --runs 5 'sleep 0.3'
# compare two different files
$ hyperfine 'hexdump file' 'xxd file'
# warm up any caches before actually doing measurements
$ hyperfine --warmup 3 'grep -R TODO *'
# cool down any caches before actually doing measurements
$ hyperfine --prepare 'sync; echo 3 | sudo tee /proc/sys/vm/drop_caches' 'grep -R TODO *'
# use different numeric values for each run
$ hyperfine --prepare 'make clean' --parameter-scan num_threads 1 12 'make -j {num_threads}'
# use different non-numeric values for each run
$ hyperfine -L compiler gcc,clang '{compiler} -O2 main.cpp'
# export markdown tables
$ hyperfine --export-markdown bench.md 'sleep 0.3'
```

#rust #benchmarking #performance #software #optimisation #opensource 