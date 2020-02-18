---
date: "2020-01-10"
draft: true
tags: ["python", "pandas", "oia"]
title: "Tidying up towing data using Pandas"
---

This will be a pretty lengthy blog post detailing how I took an XLSX spreadsheet with towing data and cleaned it up to be (mostly) machine readable.

My ultimate goal is to transform it into a fancy data visualisation. I know roughly how to get there but getting there is tedious.

Rather than leave code snippets lying around my hard drive, I've decided to share what I've accomplished so far.

That and I'm going to forget how to do any of this if I don't explain it step by step!

{{< contents >}}

## Getting the data

This is the first, and sometimes hardest step. My advice is to be as explicit as is reasonable when requesting the data. It's helpful to be particular about what metadata you're after, and it'll help you if you request to receive it in a machine readable format.

In my case, I received an XLSX file. Not as ideal as a CSV or GeoJSON but also better than receiving a PDF!

You can see my original request and even get a copy of the data [here](https://fyi.org.nz/request/11018-request-of-towing-data-for-three-tamaki-makaurau-police-districts#incoming-39588).

## Parsing the data

First, we need to see what we've actually got to work with and then we can parse it into a nicer format.

```shell
> ls
Marcus Aug 2016 Jul 2019.xlsx
> mv Marcus\ Aug\ 2016\ Jul\ 2019.xlsx towing.xlsx
> head -n 1 towing.xlsx 
P!??@?6??[Content_Types].xml ??(??YMo?@?W???Z?eM?&?C??m??R??+??YR??]/?Q"?)s?w?{??ߌ???F7?xT?̘??,S?J?????1:gi*?X3?d????7[???g??}?????:0???z-C????r%????????0aZ
                                                                           6?~??\7!???_??*ò??u-ՌI?U???;S=!??B?P?r?#t?΃??ɝW??_10d? ????????$
                                                           k??C
                                                               ?????Q??????WdW҇?R??????_?Z??_?{4?r-????Z?<?}<??6??SǤ?"DP2&"???"䜊??T??B榙9?	c?D?D????Cub??kx?}??b?6pr	s?}%??:?/?®?7;*vYPq???;P?1<5??tI?3Y???J?G?????Q132B??d??L??b?ST\????.v????@"???????P!^?e??jT??=|P??u?G;?8??O?dv
                         ?_rels/.rels ??(????N?0
                                                ??H?C???n ???]&??*`????Q?A??$?F??؟???)??8??|h?*??r)?j6???|)W?R???`ϖ?<Q????j?L=?4???\lP???=?Ѐ!cG6u*????58???<???COq0J?????<??yٛ??մg}??3+??H֐Y9??|l?5?D_STҰ~J??\??%?'?\N???0PD?A??y?O???r?刦??t???w???????c?<,???F?ɷ,>??P!ωkE%??xl/_rels/workbook.xml.rels ??(??XMo?0?#?"߉?3?E????z?"q??&??C?
          ??Z??
```

Well, that's not going to work! We need to use some tools that can actually parse this data. For that, I'm going to use [Pandas](https://pandas.pydata.org/), a data analysis library for Python.

This blog post isn't intended to teach you how to use Pandas, but I'll be specific enough that you should be able to follow along with the provided dataset yourself.

Pandas has support for importing Excel spreadsheets by using the [xlrd](https://xlrd.readthedocs.io/en/latest/) library so let's install both. We'll also fetch sqlite3 which we'll use near the end:

```shell
> pip install pandas xlrd sqlite3
Collecting pandas
[...]
Installing collected packages: numpy, pandas, xlrd
Successfully installed numpy-1.18.1 pandas-0.25.3 xlrd-1.2.0
```

Time to import our Excel spreadsheet into a Pandas dataframe but there's a bit of a catch first:

```python
> python
Python 3.8.0 (default, Dec  1 2019, 12:43:25) 
[Clang 10.0.1 (clang-1001.0.46.4)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import pandas as pd
>>> workbook = pd.ExcelFile('~/Downloads/towing.xlsx')
>>> workbook.sheet_names
['Aug 16', 'Sep 16', 'Oct 16', 'Nov 16', 'Dec 16', 'Jan 17', 'Feb 17', 'Mar 17', 'Apr 17', 'May 17', 'Jun 17', 'Jul 17', 'Aug 17', 'Sep 17', 'Oct 17', 'Nov 17', 'Dec 17', 'Jan 18', 'Feb 18', 'Mar 18', 'Apr 18', 'May 18', 'Jun 18', 'Jul 18', 'Aug 18', 'Sep 18', 'Oct 18', 'Nov 18', 'Dec 18', 'Jan 19', 'Feb 19', 'Mar 19', 'Apr 19', 'May 19', 'Jun 19', 'Jul 19']
```

Our workbook is not one big sheet but in fact, one sheet per month. For those of you who don't use Excel (ie me), sheets are those tabs at the bottom of the application. Usually you'll just see "Sheet 1" when viewing a blank spreadsheet.

We still need to parse each sheet, one by one, in order to get a complete collection of data. To do so, we'll just iterate over each sheet and append it to an initially empty data frame:

```python
> python
Python 3.8.0 (default, Dec  1 2019, 12:43:25) 
[Clang 10.0.1 (clang-1001.0.46.4)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import pandas as pd
>>> workbook = pd.ExcelFile("~/Downloads/towing.xlsx")
>>> df = pd.DataFrame()
>>> for sheet_name in workbook.sheet_names:
...     sheet = workbook.parse(sheet_name=sheet_name)
...     df = df.append(sheet, sort=False)
... 
>>> df
     Unnamed: 0        Date and Time   ... Unnamed: 9 Unnamed: 10
0           NaN                   NaN  ...        NaN         NaN
1           NaN   Monday, 01 Aug 2016  ...        NaN         NaN
2           NaN                   NaN  ...        NaN         NaN
3           NaN            08:34 a.m.  ...        NaN         NaN
4           NaN            10:06 a.m.  ...        NaN         NaN
...         ...                   ...  ...        ...         ...
1754        NaN                   NaN  ...        NaN         NaN
1755        NaN  Tuesday, 23 Jul 2019  ...        NaN         NaN
1756        NaN                   NaN  ...        NaN         NaN
1757        NaN            09:05 p.m.  ...        NaN         NaN
1758        NaN                   NaN  ...        NaN         NaN

[64160 rows x 11 columns]
```

There we go, all 64,000 rows in one nice data frame we can reason about!

We've still got a long way to go however as we don't have a nice index, nor do we even have anywhere remotely consistent data.

## Cleaning up the data

First, let's have a closer look at our data by printing the first 25 rows:

```python
>>> df[0:25]
   Unnamed: 0        Date and Time   ... Unnamed: 9 Unnamed: 10
0         NaN                   NaN  ...        NaN         NaN
1         NaN   Monday, 01 Aug 2016  ...        NaN         NaN
2         NaN                   NaN  ...        NaN         NaN
3         NaN            08:34 a.m.  ...        NaN         NaN
4         NaN            10:06 a.m.  ...        NaN         NaN
5         NaN            10:42 a.m.  ...        NaN         NaN
6         NaN            11:49 a.m.  ...        NaN         NaN
7         NaN            01:18 p.m.  ...        NaN         NaN
8         NaN            04:09 p.m.  ...        NaN         NaN
9         NaN            04:10 p.m.  ...        NaN         NaN
10        NaN            04:17 p.m.  ...        NaN         NaN
11        NaN            04:21 p.m.  ...        NaN         NaN
12        NaN            04:31 p.m.  ...        NaN         NaN
13        NaN            04:40 p.m.  ...        NaN         NaN
14        NaN            04:44 p.m.  ...        NaN         NaN
15        NaN            04:57 p.m.  ...        NaN         NaN
16        NaN            08:17 p.m.  ...        NaN         NaN
17        NaN                   NaN  ...        NaN         NaN
18        NaN  Tuesday, 02 Aug 2016  ...        NaN         NaN
19        NaN                   NaN  ...        NaN         NaN
20        NaN            02:04 a.m.  ...        NaN         NaN
21        NaN            10:50 a.m.  ...        NaN         NaN
22        NaN            11:41 a.m.  ...        NaN         NaN
23        NaN            02:32 p.m.  ...        NaN         NaN
24        NaN            04:13 p.m.  ...        NaN         NaN

[25 rows x 11 columns]
```

Focusing on the date column, there's a pattern that sticks out. The data is actually grouped visually by day like so:

```text
[empty cell]
Monday, 01 Aug 2016
[empty cell]
08:34 a.m.
[...]
08:17 p.m.
[empty cell]
Tuesday, 02 Aug 2016
[empty cell]
02:04 a.m.
```

There's no consistency from a machine readable point of view so we'll have to clean it up into something more consistent manually. Before we do that, let's get some column headings.

```python
> from pprint import pprint
> pprint(list(df.columns))
['Unnamed: 0',
 'Date and Time ',
 'Vehicle ',
 'Towed From ',
 'Towed Too ',
 'Unnamed: 5',
 'Unnamed: 6',
 'Unnamed: 7',
 'Unnamed: 8',
 'Unnamed: 9',
 'Unnamed: 10']
```

That's a lot of columns.

After a quick skim of the dataset, we can see that only `Unnamed: 5` is used. We'll discard the unused columns and then clean up the remaining data:

```python
> df = df.drop(columns=['Unnamed: 0', 'Unnamed: 6', 'Unnamed: 7', 'Unnamed: 8', 'Unnamed: 9', 'Unnamed: 10'])
>>> df
            Date and Time          Vehicle   ...       Towed Too  Unnamed: 5
0                      NaN              NaN  ...              NaN        NaN
1      Monday, 01 Aug 2016              NaN  ...              NaN         55
2                      NaN              NaN  ...              NaN         55
3               08:34 a.m.  TOYOTA FUNCARGO  ...   2 PUKEHANA AVE         55
4               10:06 a.m.          AUDI A3  ...  30A CROMWELL ST         55
...                    ...              ...  ...              ...        ...
1754                   NaN              NaN  ...       Total    1      Romeo
1755  Tuesday, 23 Jul 2019              NaN  ...              NaN      Romeo
1756                   NaN              NaN  ...              NaN      Romeo
1757            09:05 p.m.   TOYOTA, ESTIMA  ...     7 FLAVELL DR      Romeo
1758                   NaN              NaN  ...       Total    1      Romeo
```

It's starting to look more reasonable. Now let's assign some appropriate names. You can't quite tell from the code snippets but there's actually some rogue whitespace in the columns so I opened to rename all of them for consistency:

```python
> df = df.rename(columns={'Unnamed: 5': 'Suburb', 'Date and Time ': 'Date', 'Towed From ': 'Origin', 'Towed Too ': 'Destination', 'Vehicle ': 'Vehicle'})
>>> df
                      Date          Vehicle  ...      Destination Suburb
0                      NaN              NaN  ...              NaN    NaN
1      Monday, 01 Aug 2016              NaN  ...              NaN     55
2                      NaN              NaN  ...              NaN     55
3               08:34 a.m.  TOYOTA FUNCARGO  ...   2 PUKEHANA AVE     55
4               10:06 a.m.          AUDI A3  ...  30A CROMWELL ST     55
...                    ...              ...  ...              ...    ...
1754                   NaN              NaN  ...       Total    1  Romeo
1755  Tuesday, 23 Jul 2019              NaN  ...              NaN  Romeo
1756                   NaN              NaN  ...              NaN  Romeo
1757            09:05 p.m.   TOYOTA, ESTIMA  ...     7 FLAVELL DR  Romeo
1758                   NaN              NaN  ...       Total    1  Romeo
```

Even better! We're almost in a position to start parsing our dates into valid timestamps.

## Performing some data fixes

Here's the part that was the most difficult, which I've already done for you thankfully.

Basically, I wrote some code to parse the dates into timestamps and it would keep breaking. I'd fix the offending piece of data, run it again and see where it broke next. I'd keep doing that until the script ran to completion.

Here are the following data fixes, provided so you can follow along entirely with my process:

```python
df = df.replace('Sunda, 28 Aug 2016', 'Sunday, 28 Aug 2016')
df = df.replace('Satruday, 06 Jan 2017', 'Saturday, 06 Jan 2017')
df = df.replace('Tuesday, 28th Nov ', 'Tuesday, 28 Nov 2017')
df = df.replace('4.40pm', '4:40pm')
df = df.replace('5.08pm', '5:08pm')
df = df.replace('14:55 pm', '2:55pm')
df = df.replace('4.37 p.m.', '4:37pm')
df = df.replace('17:01 p.m', '5:01pm')
df = df.replace('4.22 p.m.', '4:22pm')
df = df.replace('4.32 p.m.', '4:32pm')
```

## Transforming dates into valid timestamps

Now that our data is in much better shape, we can tackle arguably the part that really got me thinking. It wasn't difficult in a blood, sweat and tears kind of way but was definitely a stretch.

Before I walk you through what I settled for, I'll caveat that there may be more ideal ways of doing this. What I wrote got the job done and that's all I cared about ;)

Since our date column includes pseudo-headings, I realised I can just pass over the whole column once.

If the word `day` is in a column (as it would be in every heading), we can use that cell to determine the date we've gotten up to. Any time below that cell implicitly refers to that date so we can merge it into the following cells.

Here's a visual example of what I mean:

| Before                             | After                                                 |
| ---------------------- | -------------------------------- |
| Monday, 01 Aug 2016  | Monday, 01 Aug 2016                   |
| NaN                                 | NaN                                                  |
| 8:34 a.m.                        | Monday, 01 Aug 2016 8:34 a.m. |
| NaN                                 | NaN                                                   |
| Tuesday, 23 Jul 2019   | Tuesday, 23 Jul 2019                     |
| NaN                                 | NaN                                                   |
| 4:00 a.m.                        | Tuesday, 23 Jul 2019 4:00 a.m.  |
| 9:42 p.m.                        | Tuesday 23 Jul 2019 9:42 p.m.  |

The goal here isn't to get super accurate timestamps just yet, but rather something good enough that is consistent and therefore parsable. The rest of the mess, such as those `NaN` are trivial to get rid of later.

Anyway, here's the shortest possible version of the code required that I came up with:

```python
>>> current_date = ''
>>> for idx, entry in enumerate(df['Date']):
...     item = str(entry)
...     if 'day' in item:
...             current_date = item
...     if 'day' not in item and item != 'nan':
...             df.iloc[idx]['Date'] = pd.to_datetime(f'{current_date} {item}')
...
```

It'll take a little bit to run, as it has to iterate over every row but it leaves us with something pretty promising:

```python
>>> df
                      Date          Vehicle  ...      Destination Suburb
0                      NaN              NaN  ...              NaN    NaN
1      Monday, 01 Aug 2016              NaN  ...              NaN     55
2                      NaN              NaN  ...              NaN     55
3      2016-08-01 08:34:00  TOYOTA FUNCARGO  ...   2 PUKEHANA AVE     55
4      2016-08-01 10:06:00          AUDI A3  ...  30A CROMWELL ST     55
...                    ...              ...  ...              ...    ...
1754                   NaN              NaN  ...       Total    1  Romeo
1755  Tuesday, 23 Jul 2019              NaN  ...              NaN  Romeo
1756                   NaN              NaN  ...              NaN  Romeo
1757   2019-07-23 21:05:00   TOYOTA, ESTIMA  ...     7 FLAVELL DR  Romeo
1758                   NaN              NaN  ...       Total    1  Romeo

[64160 rows x 5 columns]
```

Ok, I lied earlier. We use the `pd.to_datetime` function earlier to generate entirely valid timestamps. All that's left is to get rid of those intermediary cells and we should have some fresh data ready to operate on.

```python
>>> df = df.dropna()
>>> df[0:25]
                   Date            Vehicle  ...      Destination Suburb
3   2016-08-01 08:34:00    TOYOTA FUNCARGO  ...   2 PUKEHANA AVE     55
4   2016-08-01 10:06:00            AUDI A3  ...  30A CROMWELL ST     55
5   2016-08-01 10:42:00        MAZDA DEMIO  ...   230 SYMONDS ST     55
6   2016-08-01 11:49:00    TOYOTA VANGUARD  ...   230 SYMONDS ST     55
7   2016-08-01 13:18:00        TOYOTA VITZ  ...   230 SYMONDS ST     55
8   2016-08-01 16:09:00  NISSAN PATHFINDER  ...   230 SYMONDS ST     55
9   2016-08-01 16:10:00    VOLKSWAGEN GOLF  ...   230 SYMONDS ST     55
10  2016-08-01 16:17:00       HONDA ACCORD  ...   230 SYMONDS ST     55
11  2016-08-01 16:21:00  TOYOTA HIGHLANDER  ...   230 SYMONDS ST     55
12  2016-08-01 16:31:00        TOYOTA RAV4  ...   230 SYMONDS ST     55
13  2016-08-01 16:40:00          HONDA FIT  ...   230 SYMONDS ST     55
14  2016-08-01 16:44:00      TOYOTA CELICA  ...   230 SYMONDS ST     55
15  2016-08-01 16:57:00   HOLDEN COMMODORE  ...   230 SYMONDS ST     55
16  2016-08-01 20:17:00      TOYOTA TRUENO  ...   230 SYMONDS ST     55
20  2016-08-02 02:04:00         HONDA JAZZ  ...      3 KORARI ST     55
21  2016-08-02 10:50:00      TOYOTA CARINA  ...       HENDON AVE     55
22  2016-08-02 11:41:00        MAZDA DEMIO  ...   230 SYMONDS ST     55
23  2016-08-02 14:32:00     TOYOTA COROLLA  ...   230 SYMONDS ST     55
24  2016-08-02 16:13:00      NISSAN PULSAR  ...   230 SYMONDS ST     55
25  2016-08-02 16:21:00             BMW X3  ...   230 SYMONDS ST     55
26  2016-08-02 16:23:00    VOLKSWAGEN GOLF  ...   230 SYMONDS ST     55
27  2016-08-02 16:23:00         CITROEN C3  ...   230 SYMONDS ST     55
28  2016-08-02 16:40:00      VMOTO SCOOTER  ...   230 SYMONDS ST     55
29  2016-08-02 16:57:00       SUZUKI SWIFT  ...   230 SYMONDS ST     55
30  2016-08-02 18:54:00      NISSAN NAVARA  ...   230 SYMONDS ST     55

[25 rows x 5 columns]
```

Looks good to me!

### Final cleanup

Oh, one last thing. You'll see all of those numbers under the suburb section that don't appear to mean anything. The correspondence that came with the dataset explains what those represent. Let's quickly convert them into something human readable.

```python
df['Suburb'] = df['Suburb'].replace(55, 'CENTRAL')
df['Suburb'] = df['Suburb'].replace(66, 'NORTHERN')
df['Suburb'] = df['Suburb'].replace(77, 'WESTERN')
df['Suburb'] = df['Suburb'].replace(88, 'SOUTHERN')
df['Suburb'] = df['Suburb'].replace(99, 'CBD')
df['Suburb'] = df['Suburb'].replace('Romeo', 'RURAL')
```

Here's the final result after all of our hard work beating the dataset into shape:

```python
>>> df
                     Date           Vehicle  ...            Destination   Suburb
3     2016-08-01 08:34:00   TOYOTA FUNCARGO  ...         2 PUKEHANA AVE  CENTRAL
4     2016-08-01 10:06:00           AUDI A3  ...        30A CROMWELL ST  CENTRAL
5     2016-08-01 10:42:00       MAZDA DEMIO  ...         230 SYMONDS ST  CENTRAL
6     2016-08-01 11:49:00   TOYOTA VANGUARD  ...         230 SYMONDS ST  CENTRAL
7     2016-08-01 13:18:00       TOYOTA VITZ  ...         230 SYMONDS ST  CENTRAL
...                   ...               ...  ...                    ...      ...
1744  2019-07-03 12:57:00  HOLDEN COMMODORE  ...           18 COWLEY PL    RURAL
1745  2019-07-03 13:45:00      SUZUKI SWIFT  ...               ADAMS DR    RURAL
1749  2019-07-12 12:01:00        FIAT PUNTO  ...  22 HENDERSON VALLEY R    RURAL
1753  2019-07-21 13:00:00         MAZDA MPV  ...           61 CROOKS RD    RURAL
1757  2019-07-23 21:05:00    TOYOTA, ESTIMA  ...           7 FLAVELL DR    RURAL

[49174 rows x 5 columns]
```

While we're nowhere near done just yet, I think this is a good place to cap off this post as moving forward, the dataset will shift out of Pandas as we start to translate towing addresses into tangible GPS coordinates. Once we've got coordinates, we can begin plotting this data on a map.

Personally, I learnt a lot about Pandas by going through this whole ordeal. At first, I thought no way could this data set possibly be cleaned up but with enough head banging, anything is possible!

### Exporting the data

Rather than just leave this data sitting in memory, let's export it into a [SQLite](https://www.sqlite.org/index.html) database so we can play around with it a bit more.

You'll need the `sqlite3` python package installed which I recommended installing near the top of this post.

We also need to set an index or trying to export the dataset will fail. Not quite sure why but presumably it doesn't know what to do with the default index. I haven't looked into it but we'll just set our timestamps as the new index.

Given that a human is entering this data, I highly doubt any of our timestamps clash. That said, it's always a good idea to choose something truly guaranteed to be unique so consider yourself warned :)

```python
>>> df = df.set_index('Date')
>>> df
                              Vehicle          Origin            Destination   Suburb
Date                                                                                 
2016-08-01 08:34:00   TOYOTA FUNCARGO       33 PAH RD         2 PUKEHANA AVE  CENTRAL
2016-08-01 10:06:00           AUDI A3  30 CROMWELL ST        30A CROMWELL ST  CENTRAL
2016-08-01 10:42:00       MAZDA DEMIO       SULTAN LN         230 SYMONDS ST  CENTRAL
2016-08-01 11:49:00   TOYOTA VANGUARD    1 WAIOHUA RD         230 SYMONDS ST  CENTRAL
2016-08-01 13:18:00       TOYOTA VITZ       CAWLEY ST         230 SYMONDS ST  CENTRAL
...                               ...             ...                    ...      ...
2019-07-03 12:57:00  HOLDEN COMMODORE     BEVERLEY RD           18 COWLEY PL    RURAL
2019-07-03 13:45:00      SUZUKI SWIFT        ADAMS DR               ADAMS DR    RURAL
2019-07-12 12:01:00        FIAT PUNTO  2 BERDINNER RD  22 HENDERSON VALLEY R    RURAL
2019-07-21 13:00:00         MAZDA MPV       PURIRI RD           61 CROOKS RD    RURAL
2019-07-23 21:05:00    TOYOTA, ESTIMA    9 FLAVELL DR           7 FLAVELL DR    RURAL

[49174 rows x 4 columns]
```

Now we're ready to export it:

```python
>>> import sqlite3
>>> with sqlite3.connect('towing.db') as conn:
...     df.to_sql('towing', conn)
...
```

You should now have a file called `towing.db` sitting in the same directory that you opened your Python REPL.

You might want to use a GUI tool like [DB Browser for SQLite](https://sqlitebrowser.org/) to play around with it. You might notice that we've still got some data that isn't quite right and such is the life of data analysis I suppose. I wouldn't know since I'm just a hobbyist, hahaha.

Let's run a sample query to see the top 5 cars just to cap this post off once and for all:

```sql
SELECT vehicle, COUNT(*) AS count
FROM towing
GROUP BY vehicle
ORDER BY count DEST
LIMIT 5
```

We get the following table back:

| Vehicle                          | Count |
| --------------------- | ------ |
| TOYOTA COROLLA    | 2103   |
| SUZUKI SWIFT            | 1602   |
| NISSAN TILDA             | 1251    |
| VOLKSWAGEN GOLF | 1146   |
| HONDA FIT                   | 1089  |

Very cool. Personally, I'm rubbish at SQL so this should be a fun dataset to experiment with.

See you for Part 2!
