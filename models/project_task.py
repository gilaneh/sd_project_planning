# -*- coding: utf-8 -*-
import datetime
from datetime import  timedelta
# import random

from odoo import models, fields, api

from colorama import Fore

class SdProjectPlanning(models.Model):
    _inherit = 'project.task'

    wbs_code = fields.Char(string='WBS')
    parent_wbs = fields.Char(related='parent_id.wbs_code')
    cbs = fields.Integer()
    weight_value = fields.Float()
    weight_factor = fields.Float()
    progress_plan = fields.Float()
    progress_actual = fields.Float()
