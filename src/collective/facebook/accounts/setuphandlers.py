# -*- coding: utf-8 -*-

from Products.CMFCore.utils import getToolByName

from collective.facebook.accounts.config import PROJECTNAME

INITIAL_PROFILE_ID = 'profile-%s:initial' % PROJECTNAME


def import_various(context):
    """
    Import step for configuration that is not handled in xml files.
    """

    # Only run step if a flag file is present
    if context.readDataFile('%s_various.txt' % PROJECTNAME) is None:
        return
    logger = context.getLogger(PROJECTNAME)
    site = context.getSite()
    apply_initial_profile(site, logger)


def apply_initial_profile(context, logger):
    """
    Method to apply our initial GS profile, including dependencies.

    To see if a dependency profile has already been installed, we
    could run 'portal_setup.getProfileImportDate(profile_id)', but
    this only gives a date for profiles that are directly applied, not
    as dependencies. Also, when someone removes install logs from
    portal_setup in the ZMI, this date will come up empty as well. So
    instead we apply all recursive dependencies ourselves, which is
    actually quite easy.

    """

    setup = getToolByName(context, 'portal_setup')
    logger.info("Checking if initial profile %s or one of its (recursive) "
                "dependencies need to be applied.", INITIAL_PROFILE_ID)
    for dependency in setup.getProfileDependencyChain(INITIAL_PROFILE_ID):
        # Note: getting the profile dependency chain already fails
        # with a KeyError when our profile id, or one of its
        # (recursive) dependencies does not exist.
        if not setup.getProfileImportDate(dependency):
            logger.info("Applying dependency profile %s.",
                        dependency)
            setup.runAllImportStepsFromProfile(dependency,
                                               ignore_dependencies=True)
        else:
            logger.info("Dependency profile %s already applied.",
                        dependency)
