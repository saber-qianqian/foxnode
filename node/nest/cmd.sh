# !/bin/bash

server_logf='/tmp/log/self-hronbill-server/'` date +%Y/%m/` 
server_log=$server_logf`date +%d`'.log'

static_server_logf='/tmp/log/self-hronbill-static-server/'` date +%Y/%m/` 
static_server_log=$static_server_logf`date +%d`'.log'

echo 'SERVICE START AT '` date +%Y/%m/%d-%T` >> $server_log
echo 'SERVICE START AT '` date +%Y/%m/%d-%T` >> $static_server_log

# make log files
mkdir -p $server_logf
mkdir -p $static_server_logf

startService(){
	echo 'web service start , logfile:'$server_log
	cd './server/' && nohup node index.js >> $server_log &

	echo 'static service start , logfile:'$static_server_log
	cd './static-server/' && nohup node index.js >> $static_server_log &
}

stopService(){
	if [ ! -f './server/pids' ]; then
		echo ""
		echo 'stopService outline...'
		echo 'you can executive command：'
		echo '    ps -ef | grep node | grep index.js'
		echo ""
	else
		echo 'stop server'
		echo 'SERVICE STOP AT '` date +%Y/%m/%d-%T` >> $server_log

		cat './server/pids' | while read pid; do
			echo "kill pid :" $pid
			kill $pid
		done
		rm -r './pids'
		echo 'done'
	fi

	if [ -f './static-server/pids' ]; then
		echo 'stop static server'
		echo 'STATIC SERVICE STOP AT '` date +%Y/%m/%d-%T` >> $static_server_log

		cat './static-server/pids' | while read pid
		do
			echo "kill pid :" $pid
			kill $pid
		done
		rm -r './static-server/pids'
		echo 'done'
	fi
}

if [ $# -eq 0 ];then
	echo "you should pass args start|stop "
else
	case $1 in
		"start")
			stopService
			# clearTmp
			startService
			;;
		"stop")
			stopService
			;;
		# "stopAll") 
			# stopAllService
			# ;;
	esac
fi