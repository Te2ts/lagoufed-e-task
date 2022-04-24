#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const ora = require('ora')

// 相关判断
const isWin = process.platform === 'win32'

// 相关cmd
const searchCMD = port => (process.platform === 'win32' ? `netstat -aon | findstr ${port}` : `ss -lnp | grep ${port}`)
const killCMD = pid => (process.platform === 'win32' ? `taskkill /F /PID ${pid}` : `kill -9 ${pid}`)

/**
 * 删除指定端口的占用程序
 * @param {string} port - 端口号
 */
function killProcess(port) {
  const { exec } = require('child_process')
  const findSpinner = ora('Finding process...').start()

  exec(searchCMD(port), (error, stdout, stderr) => {
    findSpinner.stop()
    if (error) {
      return console.log(chalk.yellow(`port: ${port} process not found`))
    }

    let pid

    if (isWin) {
      // TODO: SUPPORT OTHER PROTOCAL
      // 通过拆分字符串方式找到第一个端口
      const portRes = stdout.split('\nTCP').map(item => item.split(' ').filter(str => str.indexOf('\r\n') > -1)[0])
      if (portRes && +portRes !== 0) {
        pid = portRes[0]
      } else {
        return console.log(chalk.yellow(`port: ${port} process not found`))
      }
    } else {
      pid = stdout.split(',').filter(str => str.indexOf('pid=') > -1)[0].split('=')[1]
    }

    console.log(chalk.blueBright(`process found port: ${port} pid: ${pid}`))

    const killSpinner = ora('killing process...').start()
    exec(killCMD(pid), (error, stdout, stderr) => {
      killSpinner.stop()
      console.log(chalk.greenBright(`kill success`))
    })
  })
}

/**
 * 查询指定端口的占用程序
 * @param {string} port - 端口号
 */
function searchPortProcess(port) {
  const { exec } = require('child_process')
  exec(searchCMD(port), (error, stdout, stderr) => {
    if (error) {
      return console.log(chalk.yellow(`port: ${port} process not found`))
    }
    console.log(stdout)
  })
}

program
  .version('0.0.1')
  .option('-k, --kill-port <port>', 'kill port')
  .option('-s, --search-port <port>', 'search information for process')

program.parse(process.argv)

const options = program.opts()

// 搜索端口对应的pid
if (options.searchPort) {
  return searchPortProcess(options.searchPort)
}

// kill port
if (options.killPort) {
  return killProcess(options.killPort)
}

// 默认为kill port
if (program.args[0]) {
  killProcess(program.args[0])
}
