# Are all Azure regions alike?
01 January 0001

No! As I learned recently, only a handful of regions feature multiple availability zones.

Having originally started out using [AWS](https://aws.amazon.com), I had assumed that every region has multiple availability zones.

Azure maintains [a list](https://docs.microsoft.com/en-us/azure/availability-zones/az-region#azure-regions-with-availability-zones) of regions with multiple AZs so if you need redundancy, you&#39;re best off picking one of these.

Some services may refuse to deploy entirely (such as &#34;geo-redundant&#34; gateways in us-east as I found out recently)
