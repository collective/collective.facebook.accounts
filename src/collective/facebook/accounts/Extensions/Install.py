# -*- coding: utf-8 -*-

from Products.CMFCore.utils import getToolByName

from collective.facebook.accounts.config import PROJECTNAME


def install(portal, reinstall=False):
    setup_tool = getToolByName(portal, 'portal_setup')
    if not reinstall:
        initial = 'profile-%s:initial' % PROJECTNAME
        setup_tool.runAllImportStepsFromProfile(initial)

    default = 'profile-%s:default' % PROJECTNAME
    setup_tool.runAllImportStepsFromProfile(default)
    return "Ran all install steps."


def uninstall(portal, reinstall=False):
    if not reinstall:
        profile = 'profile-%s:uninstall' % PROJECTNAME
        setup_tool = getToolByName(portal, 'portal_setup')
        setup_tool.runAllImportStepsFromProfile(profile)

        # XXX: Configlet is not unregistered using just GS, so we do it here;
        # we have 2 profiles: initial and default; could it be that?
        portal_controlpanel = getToolByName(portal, 'portal_controlpanel')
        portal_controlpanel.unregisterConfiglet('FacebookSettings')

        return "Ran all uninstall steps."
