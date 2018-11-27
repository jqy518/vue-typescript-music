import jsonp from 'jsonp'
import qs from 'qs'

export function getList (keyword:string) {    
        return new Promise((resolve, reject) => {
            let params = {
                cmd: 300,
                keyword: keyword,
                page: 1,
                pageSize: 20,
                outputtype: 'jsonp'
            }

           jsonp(`http://mobilecdn.kugou.com/new/app/i/search.php?${qs.stringify(params)}`, function (err, data) { 
            if (err) {
                    throw err
                } else {
                    resolve(data)
                }
           }) 
        })
    }
