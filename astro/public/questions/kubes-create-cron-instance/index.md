# How can I create an instance of a Kube cronjob?
01 January 0001

If you&#39;re trying to test out a job, and don&#39;t want to wait for however long, you can manually create a job instance.

Assuming our cronjob is called `sports-leaderboard-calc`, you can create it like so:

```bash
&gt; kubectl create job instance-name --from=cronjob/sports-leaderboard-calc
job.batch/instance-name
```

You&#39;ll then see the resulting job and pod under `kubectl get job` and `kubectl get pod` respectively.