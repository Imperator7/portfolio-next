function handler(event) {
  const request = event.request
  const uri = request.uri

  if (uri === '/') {
    request.uri = '/index.html'
  } else if (uri.endsWith('/')) {
    request.uri = uri.slice(0, -1) + '.html'
  } else if (!uri.includes('.')) {
    request.uri = uri + '.html'
  }

  return request
}
