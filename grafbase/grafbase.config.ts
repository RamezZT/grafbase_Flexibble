import { g, auth, config } from '@grafbase/sdk'
// Keep in mind that these imports are from grafbase/sdk which is a schema genrator
// but all of the code is for grafbase and graphql
// @ts-ignore

const Student = g.model("Student", {
  name: g.string(),
  number: g.string().length({ min: 10, max: 10 }).unique()
}).auth(rules => { rules.public().read(), rules.private().create().delete().update() });
// @ts-ignore
const User = g.model('User', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  firstLog: g.boolean().default(true),
  desciption: g.string(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(() => Project).list().optional(),
}).auth((rules) => { rules.public().read(), rules.private().create().delete().update() })
// @ts-ignore
const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  desciption: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User)

}).auth((rules) => { rules.public().read(), rules.private().create().delete().update() })

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET')
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  }
})
