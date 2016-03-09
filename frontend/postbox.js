import $ from 'jquery'

// postbox integration
let postboxLink = $('#postbox-link')

$.ajax(postboxLink.attr('href'), {
}).done((data) => {
  // success
  let messagesTable = $(data).find('table.messages-overview')
  let messageCount = messagesTable.find('tbody>tr').length
  postboxLink.attr('data-bubble', messageCount)
}).fail(() => {
  // fail
  console.log('ERROR: postbox currently unavailable')
  postboxLink.attr('data-bubble', '!')
  postboxLink.data({
    'content': postboxLink.data('error-msg'),
    'placement': 'bottom',
    'toggle': 'popover'
  }).on('click', (e) => {
    e.preventDefault()
  }).popover({
    trigger: 'hover focus',
    container: 'body'
  })
})
