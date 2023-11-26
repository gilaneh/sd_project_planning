# -*- coding: utf-8 -*-
{
    'name': "sd_project_planning",

    'summary': """
        """,

    'description': """
        
    """,

    'author': "Arash Homayounfar",
    'website': "https://gilaneh.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Service Desk/Service Desk',
    'application': True,
    'version': '0.0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'web', 'mail', 'project'],

    # always loaded
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        # 'views/views.xml',
        'views/project_task.xml',
        # 'views/diagram.xml',
        # 'views/location.xml',
        # 'views/values.xml',
        # 'views/activities.xml',
    ],
    'assets': {
        # 'website.assets_editor': [
        #     'static/src/**/*',
        # ],

        'web.assets_frontend': [

            'sd_project_planning/static/src/css/style.scss',
            # 'sd_project_planning/static/src/js/website_form_sd_project_planning.js'
        ],
        'web.assets_backend': [

            'sd_project_planning/static/src/css/style.scss',
            # 'sd_project_planning/static/src/css/styles.css',
            # 'sd_project_planning/static/src/lib/interactjs/interact.min.js',
            # 'sd_project_planning/static/src/js/diagram_process.js',
        ],
        'web.report_assets_common': [

            'sd_project_planning/static/src/css/report_styles.css',
            # 'sd_project_planning/static/src/js/website_form_sd_project_planning.js'
        ],

    },

    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'license': 'LGPL-3',

}
