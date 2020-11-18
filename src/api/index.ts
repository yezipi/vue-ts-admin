

import common from '@/api/common'
import article from '@/api/article'
import mood from '@/api/mood'
import log from '@/api/log'
import tag from '@/api/tag'
import comment from '@/api/comment'
import feedback from '@/api/feedback'
import user from '@/api/user'
import blogroll from '@/api/blogroll'
import settings from '@/api/settings'
import column from '@/api/column'
import album from '@/api/album'
import picture from '@/api/picture'
// const api: any = {
//   common,
//   article,
//   mood,
//   log,
//   tag,
//   comment,
//   feedback,
//   user,
//   blogroll,
// }

const api: any = class Api {
  common = common
  article = article
  mood = mood
  log = log
  tag = tag
  comment = comment
  feedback = feedback
  user = user
  blogroll = blogroll
  settings = settings
  column = column
  album = album
  picture = picture
}

export default new api();
