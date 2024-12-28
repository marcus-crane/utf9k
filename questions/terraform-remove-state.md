---
category: questions
description: In which I have more data than I know what to do with
output: src/content/questions
publish: true
slug: terraform-remove-state
tags:
  - terraform
  - software
  - operations
  - terraform
  - software
  - operations
title: How can I remove an item from Terraform state?
---
First, you'll want to find the resource identifier for the item you're looking to delete

```bash
$ terraform state list
aws_ecr_lifecycle_policy.ecr-expiry-policy
aws_ecr_repository.blah-ecr
[...]
```

For this case, we'll use `aws_ecr_repository.blah-ecr` as our example identifier.

You can then remove it from state like so:

```bash
$ terraform state rm 'aws_ecr_repository.blah-ecr'
Removed aws_ecr_repository.blah-ecr
Successfully removed 1 resource instance(s).
```

Terraform has now "forgotten" that resource exists.

This is handy for things that are part of a stack but that you don't want to delete such as KMS keys which are generally retained for audit purposes or to ensure that no data is accidentally encrypted with no way to decrypt it in future.
