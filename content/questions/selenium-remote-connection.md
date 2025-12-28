---
category: questions
description: In which I remind myself how to connect to Selenium using Python
lastmod: 2021-09-10
lastrev: 2025-02-08
slug: selenium-remote-connection
tags:
  - python
  - selenium
title: How can I remotely connect to a Selenium cluster
---
I [recently came across an unsecured Selenium instance](https://twitter.com/sentreh/status/1435772900917735425) but I wanted to confirm my findings by making a basic request.

While I opted to use the [Python bindings](https://pypi.org/project/selenium/) for [Selenium](https://www.selenium.dev/), there wasn't a quick start guide on how to remotely connect to an instance.

Here's how you can quickly connect to a Selenium instance and do a basic request using Python:

```python
>>> from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
>>> from selenium import webdriver
>>> hub_url = "http://example.com:4444/wd/hub"
>>> driver = webdriver.Remote(command_executor=hub_url, desired_capabilities=DesiredCapabilities.CHROME)
>>> driver.get("https://news.ycombinator.com")
>>> driver.find_element_by_tag_name("img").get_attribute("src")
'https://news.ycombinator.com/y18.svg'
```
