Another tool to monitor filesystem, CPU usage and memory status on real time for several servers
=========

![MonitorJS capture](https://github.com/Loksly/monitorjs/blob/master/monitorjs.png)


Keywords:
angularjs, nodejs, jquery, bootstrap, realtime, dashboard, filesystem, cpu, ram.

To deploy follow these instructions:

```
git clone "https://github.com/Loksly/monitorjs"
cd monitorjs
npm install
bower install
nohup forever index.js &
```


You may want to change the list of servers you want to track at public/config.json file.
