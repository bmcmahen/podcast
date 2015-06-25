// create itunes podcast feed: https://github.com/maxnowack/node-podcast
// generate an itunes rss feed for podcasts: https://rss.itunes.apple.com/us/
//
// for more information about rss feeds. Basically, it is just agreed upon format for xml. So you are
// fetching xml, and parsing that: http://www.xml.com/pub/a/2002/12/18/dive-into-xml.html
// expected look: https://github.com/maxnowack/node-podcast/blob/master/test/expectedOutput/podcast.xml

// import request from 'superagent'
//
// request
//   .get('http://www.cbc.ca/podcasting/includes/calgwildrose.xml')
//   .accept('xml')
//   .end((err, res) => {
//     console.log(res.text)
//   })
//
//   for reading from xml: https://github.com/assistunion/xml-stream

'use strict'

import Wreck from 'wreck'
import Boom from 'boom'
import XmlStream from 'xml-stream'
import FeedParser from 'feedparser'
import xml2js from 'xml2js'

let routes = [
  {
    path: '/api/podcast',
    method: 'GET',
    handler: function (request, reply) {

      // todo: eventually this should be done entirely with
      // streams, i think, for better peformance. We would then
      // normalize it to store into our database.
      let path = 'http://www.cbc.ca/podcasting/includes/calgwildrose.xml'
      Wreck.get(path, (err, res, payload) => {
        if (err) return reply(err)
        return parseResponse(payload)
      })

      function parseResponse(xmlString) {
        let parser = new xml2js.Parser()
        parser.parseString(xmlString, (err, result) => {
          if (err) return reply(err)
          return reply(result)
        })
      }

      // let options = { downstreamRes: feedparser }
      // Wreck.request('get', path, options, (err, res) => {
      //   res.pipe(feedparser)
      // })

      // feedparser.on('error', err => console.error(err))
      // feedparser.on('readable', function() {
      //   console.log('on readable')
      //   // reply(this)
      //   let stream = this;
      //   let meta = this.mea;
      //   var item;
      //
      //   while (item = stream.read()) {
      //     console.log(item)
      //   }
      //   reply(item)
      // })
    }
  }
]

export default routes
