import protocol from './protocol'

const request = (input: string, options): Promise<string> => {
  return new Promise((resolve, reject) => {
    const prtcl = protocol(input)
    const req = prtcl.request(input, options, (res) => {
      let data = ''
      res.on('data', (d: string) => (data += d))
      res.on('end', () => resolve(data.toString()))
    })
    req.on('error', (err: Error) => reject(err))
    req.end()
  })
}

// request('https://www.google.com', { method: 'GET' }).then((result) => {
//   console.log(result);
// });

export default request
