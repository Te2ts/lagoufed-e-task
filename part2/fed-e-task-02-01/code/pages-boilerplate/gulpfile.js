// 实现这个项目的构建任务
const { src, dest, parallel, series } = require('gulp')

const del = require('del')

const sass = require('gulp-sass')(require('sass'))
const babel = require('gulp-babel')
const swig = require('gulp-swig')
const imagemin = require('gulp-imagemin')

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com'
        },
        {
          name: 'About',
          link: 'https://twitter.com'
        },
        {
          name: 'divider'
        },
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const clear = () => {
  return del(['dist']) // 清除dist目录
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' }) // 根据src目录结构生成文件和文件夹
    .pipe(sass({ outputStyle: 'expanded' })) // 输出的样式格式展开
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(swig({ data }))
    .pipe(dest('dist'))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page, image)

const build = series(clear, compile)

module.exports = {
  compile,
  style,
  clear,
  image,
  build
}
