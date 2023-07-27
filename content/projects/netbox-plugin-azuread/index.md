---
title: "netbox-plugin-azuread"
category: "projects"
slug: "netbox-plugin-azuread"
ongoing: false
description: "A now-archived plugin that added Azure Active Directory authentication to Netbox"
tags:
- "archived"
- "netbox"
- "projects"
- "python"
---

A Python plugin for the [IPAM](https://docs.microsoft.com/en-us/windows-server/networking/technologies/ipam/ipam-top) tool [Netbox](https://github.com/netbox-community/netbox), `netbox-plugin-azuread` adds support for OAuth authentication with [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/).

By default, Netbox supports standard username/password logins, SAML logins and logins configured via a remote auth header.

This plugin was my first real attempt at publishing a Python library and has been running for many months within a production deployment.

I mostly just scanned some existing AzureAD auth libraries and pieced together how to transform it into a Netbox/Django plugin.

You can view the plugin on [Github](https://github.com/marcus-crane/netbox-plugin-azuread) or [PyPI](https://pypi.org/project/netbox-plugin-azuread/).

![A slightly modified version of the Netbox login screen that shows two buttons. One is labelled Azure AD while the other is labelled Password](netbox-login.png)

![The normal Netbox login screen showing a logged in user, who has been created via OAuth with Azure AD](netbox-profile.png)
