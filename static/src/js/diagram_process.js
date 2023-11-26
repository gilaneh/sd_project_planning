/** @odoo-module **/

    /**
     * This From Controller creates monitoring data boxes on the diagram image
     */
//    console.log('aaa start')
    import FormController from 'web.FormController';
    import FormView from 'web.FormView';
    import FormRenderer from 'web.FormRenderer';
    import viewRegistry from 'web.view_registry';

    let point_x = {}
    let point_y = {}

    var DiagramProcessFormController = FormController.extend({


        saveRecord: function (recordID, options) {

            recordID = recordID || this.handle;
            const localData = this.model.localData[recordID];
            const changes = localData._changes || {};
                        console.log('arash',recordID,localData,changes, point_x)
            this._savePointerLocation(localData.data.id).then(data => console.log('_savePointerLocation', data));
    //
    //            const needsSynchronizationEmail = changes.partner_email_update === undefined
    //                ? localData.data.partner_email_update // original value
    //                : changes.partner_email_update; // new value
    //
    //            const needsSynchronizationPhone = changes.partner_phone_update === undefined
    //                ? localData.data.partner_phone_update // original value
    //                : changes.partner_phone_update; // new value
    //
    //            if (needsSynchronizationEmail && changes.email_from === undefined && localData.data.email_from) {
    //                changes.email_from = localData.data.email_from;
    //            }
    //            if (needsSynchronizationPhone && changes.phone === undefined && localData.data.phone) {
    //                changes.phone = localData.data.phone;
    //            }
    //            if (!localData._changes && Object.keys(changes).length) {
    //                localData._changes = changes;
    //            }
    //
            return this._super(...arguments).then((modifiedFields) => {
    //                if (modifiedFields.indexOf('stage_id') !== -1) {
    //                    this._checkRainbowmanMessage(this.renderer.state.res_id)
    //                }
            });
        },
        _savePointerLocation: function(res_id){
            let self = this;
            console.log('_savePointerLocation point_x ', point_x)
            return self._rpc({
                                model: 'sd_project_planning.diagram',
                                method: 'set_diagram_locations',
                                args: [false, point_x, point_y],
                            })
                            .then(data => JSON.parse(data))
                            .then(data => data)
                            .catch(e => console.log(e));
        },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * Apply change may be called with 'event.data.force_save' set to True.
     * This typically happens when directly clicking in the statusbar widget on a new stage.
     * If it's the case, we check for a modified stage_id field and if we need to display a
     * rainbowman message.
     *
     * @param {string} dataPointID
     * @param {Object} changes
     * @param {OdooEvent} event
     * @override
     * @private
     */
//        _applyChanges: function (dataPointID, changes, event) {
//            return this._super(...arguments).then(() => {
//                if (event.data.force_save && 'stage_id' in changes) {
//                    this._checkRainbowmanMessage(parseInt(event.target.res_id));
//                }
//            });
//        },

    /**
     * When updating a crm.lead, through direct use of the status bar or when saving the
     * record, we check for a rainbowman message to display.
     *
     * (see Widget docstring for more information).
     *
     * @param {integer} recordId
     */
//        _checkRainbowmanMessage: async function(recordId) {
//            const message = await this._rpc({
//                model: 'crm.lead',
//                method : 'get_rainbowman_message',
//                args: [[recordId]],
//            });
//            if (message) {
//                this.trigger_up('show_effect', {
//                    message: message,
//                    type: 'rainbow_man',
//                });
//            }
//        }
    });
    var DiagramProcessRenderer = FormRenderer.extend({
        init: function() {
            this._super(...arguments);

            this.point_x = 10;
            this.point_y = 10;
            this.point = 30;
        },
        /**
         * @override
         */
         start: function(){
            let self = this;
            var res = this._super.apply(this, arguments);

//            console.log('START, initialState', this.initialState.res_id)
            console.log('DiagramProcessFormController', this)
            interact('.draggable')
              .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                modifiers: [
                  interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                  })
                ],
                // enable autoScroll
                autoScroll: true,

                listeners: {
                  // call this function on every dragmove event
                  move: self._dragMoveListener,

                  // call this function on every dragend event
                  end (event) {
                    var textEl = event.target.querySelector('.drag-results')

                    textEl && (textEl.innerText =
                      'rect: ' + Math.round(event.rect.left) + ' x ' + Math.round(event.rect.top) +
                      // '\npage: ' + Math.round(event.pageX) + ' x ' + Math.round(event.pageY) +
                      // '\nclient: ' + Math.round(event.client.x) + ' x ' + Math.round(event.client.y) +
                      // '\nx0: ' + Math.round(event.x0) + ' x ' + Math.round(event.y0) +
                      // '\nmoved a distance of ' +
                      (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                                 Math.pow(event.pageY - event.y0, 2) | 0))
                        .toFixed(2) + 'px')
//                        console.log('interact: point_x',point_x,'point_y',point_y)

                  }
                }
              })
            // this function is used later in the resizing and gesture demos
//            self.dragMoveListener = self._dragMoveListener
            return res
        },
        _dragMoveListener: function(event) {
//            let self = this;
            console.log('dragMove point_x',point_x,'point_y',point_y)
//            console.log( 'dragMove self', self)

            var target = event.target
            // keep the dragged position in the data-x/data-y attributes
            // var x = (parseFloat(target.getAttribute('data-x')) || localStorage.getItem(`${target.id}-x`)) + event.dx
            // var y = (parseFloat(target.getAttribute('data-y')) || localStorage.getItem(`${target.id}-y`)) + event.dy
            var x = target.getAttribute('data-x') ? (parseFloat(target.getAttribute('data-x'))) + event.dx : point_x[target.id] || 0;
            var y = target.getAttribute('data-y') ? (parseFloat(target.getAttribute('data-y'))) + event.dy : point_y[target.id] || 0;
            // translate the element
            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
//            console.log('drag: ', target.id, ' ', Math.round(x), ' x ', Math.round(y))
            point_x[target.id] = Math.round(x)
            point_y[target.id] = Math.round(y)
            // update the posiion attributes
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
        },
        _test: function(){
            console.log('test', this)
        },
        _updateView: function () {
            let self = this;
            var res = this._super.apply(this, arguments);

            self._getValues()
            .then(data => {
                console.log('RENDER, id:', data, point_x, point_y)
                self._createBoxes(data);
            })
//            console.log('RENDER, initialState', this.state.res_id)

            return res
        },
        _getValues: function(){
            let self = this;
            var getValueList = self._rpc({
                                            model: 'sd_project_planning.diagram',
                                            method: 'get_diagram_values',
                                            args: [self.state.res_id],
    //                                                    context: this.given_context,
                                        })
                                        .then(data => JSON.parse(data))
                                        .then(data => {
//                                            console.log('get_diagram_values', data);
                                            return data
                                        })
                                        .catch(e => console.log(e));
            return getValueList;
         },
        _createBoxes: function(data){
            let self = this;

            let diagram = self.el.querySelector('.diagram_process_form_view_image');
//            let diagramImage = self.el.querySelector('.diagram_process_form_view_image img');
            let diagramImage = diagram.querySelector('img');
            diagramImage.classList.remove('img-fluid');

//            let dataBoxes = diagram.querySelectorAll('draggable')
            if(data[0] != undefined && data[0].data[0] != undefined ){
            let values = data[0].data[0].values
            console.log('values: ', values, Array.from(values))
            values.forEach(value => {
                var div = document.createElement("div");
                div.style.width = '100px';
                div.style.height = '100px';
                div.style.border = '1px solid red';
                div.classList.add('draggable');
                div.id = `data_box_${value.id}`;
                div.innerHTML = `${value.name}</br>P: %${value.plan}</br> A: %${value.actual}`;
                diagram.appendChild(div);
                point_x[div.id] = value.point_x;
                point_y[div.id] = value.point_y;

                div.style.transform = `translate(${point_x[div.id]}px, ${point_y[div.id]}px)`

            });
            }

         },
    });

    var DiagramProcessFormView = FormView.extend({
        config: _.extend({}, FormView.prototype.config, {
            Controller: DiagramProcessFormController,
            Renderer: DiagramProcessRenderer,

        }),
    });

    viewRegistry.add('diagram_process_form_view', DiagramProcessFormView);

    export default {
        DiagramProcessFormController: DiagramProcessFormController,
        DiagramProcessFormView: DiagramProcessFormView,
        DiagramProcessRenderer: DiagramProcessRenderer,

    };
