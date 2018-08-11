from flask import Flask, render_template

import utils

app = Flask(__name__, static_url_path='')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/projects')
def list_projects():
    projects = utils.list_content('projects', format_date=False)
    return render_template('list_projects.html', projects=projects)


@app.route('/projects/<project>')
def view_project(project):
    project = utils.view_content(f'projects/{project}', format_date=False)
    return render_template('view_project.html', project=project)


@app.route('/blog')
def list_posts():
    posts = utils.list_content('blog')
    return render_template('list_posts.html', posts=posts)


@app.route('/blog/<post>')
def view_post(post):
    post = utils.view_content(f'blog/{post}')
    return render_template('view_post.html', post=post)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000')
