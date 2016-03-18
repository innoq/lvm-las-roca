import $ from 'jquery'
import pjax from 'jquery-pjax'

let doc = $(document)

// partial page updates
let pjaxSelector = '#pjax-container'
doc.pjax('[data-pjax=active]', pjaxSelector, { fragment: pjaxSelector })
