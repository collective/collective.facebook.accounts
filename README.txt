============================
collective.facebook.accounts
============================

.. contents:: Table of Contents

Overview
--------

This product allows you to associate `Facebook`_ accounts with a Plone site.

It uses `OAuth`_ authentication.

Prerequisites
-------------

Facebook accounts are added to the Plone site using a Facebook app. You can
create your own from Facebook's `App Dashboard`_. Make sure to write
down the app's "App ID/API Key".

Usage
-----

- Go to the "Site Setup", then to the "Facebook" tool.
- Choose from the "Permissions" section, which permissions you'll need to use.
  You can get further info on each one, from the `Permissions Reference`_
- Write the "App ID/API Key" from your Facebook app (see prerequisites).
- Click on "Request user auth"
- If your browser asks to, click on "Leave this page".
- Login with the Facebook account you want to use.
- Allow permission for the app.

Done, you should now be back at your Plone site, and see your account listed
in the "Accounts" section in the tool.

An expiration date is included too.

If you want to remove an account, simply click on its red cross next to its
name. Be carefull, it will delete the account without confirmation, and it
cannot be undone.

Actually posting or getting to/from Facebook
--------------------------------------------

This product just saves the needed data in order to use the Facebook API.
You'll need additional products in order to do so, for example
`collective.facebook.portlets`_.

.. _`Facebook`: http://www.facebook.com/
.. _`collective.facebook.portlets`: http://pypi.python.org/pypi/collective.facebook.portlets
.. _`App Dashboard`: https://developers.facebook.com/apps
.. _`Permissions Reference`: https://developers.facebook.com/docs/reference/api/permissions/
.. _`OAuth`: http://oauth.net/

