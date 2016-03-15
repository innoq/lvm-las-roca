import $ from 'jquery'

// postbox integration
let postboxLink = $('#postbox-link')

$.ajax(postboxLink.attr('href'), {
}).done((data) => {
  // success
  let messagesTable = $('table.messages-overview', $.parseHTML(data))
  let messageCount = messagesTable.find('tbody>tr').length

  // set message count
  postboxLink.attr('data-bubble', messageCount)

  // render preview
  postboxLink.data({
    'content': renderPreview(messagesTable),
    'html': true,
    'placement': 'bottom',
    'title': renderPreviewTitle(postboxLink.attr('href')),
    'toggle': 'popover'
  }).on('click', (e) => {
    e.preventDefault()
  }).popover({
    container: 'body',
    trigger: 'click'
  })
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
    container: 'body',
    trigger: 'hover focus'
  })
})

function renderPreview (messagesTable) {
  // TODO: modify preview markup
  let result = $('<div>').append(messagesTable).clone()
  return result.html()
}

function renderPreviewTitle (uri) {
  let title = `<h3 class="collection-excerpt-title">
                  Benachrichtigungen
                  <a href="${uri}" class="collection-link">Alle anzeigen</a>
              </h3>`
  return $(title).html()
}
