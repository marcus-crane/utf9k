---
// markdownTemplateEngine: md
permalink: '/search.json'
---
// [
//   {%- for post in collections.questions | reverse %}
//     {
//       "slug": "{{ post.data.slug }}",
//       "content": "{{ post.templateContent | safe }}",
//       "tags": [
//         {%- for tag in post.data.tags %}
//         "{{ tag }}"
//         {% if not loop.last %},{% endif %}
//         {%- endfor %}
//       ],
//       "title": "{{ post.data.title }}"
//     }{% if not loop.last %},{% endif %}
//   {%- endfor %}
// ]

class Search {
  data() {
    return {
      title: "hi",
      templateEngineOverride: "11ty.js,md"
    }
  }

  render(data) {
    return `# This is ${data.title}`
  }
}

module.exports = Search