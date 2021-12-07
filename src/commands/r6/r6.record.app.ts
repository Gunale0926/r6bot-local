import { AppCommand, AppFunc, BaseSession, Card } from '../..';
import{ connection } from '../../tests/init'
var tabname = 'usrlib'
class R6Record extends AppCommand {
    code = 'record'; // 只是用作标记
    trigger = 'record'; // 用于触发的文字
    help = '.r6 record+r6id\n缩写".绑定"'; // 帮助文字
    intro = '绑定r6id到数据库中';
    func: AppFunc<BaseSession> = async (session) => {
        if (session.args.length == 0)
            session.sendCard(new Card().addTitle(this.code).addText(this.intro).addText(this.help))
        else
            await recordid(session.userId, session.args[0])
        async function recordid(id: string, r6id: string) {
            return new Promise<void>((resolve, reject) => {
                var exp = 'INSERT INTO ' + tabname + '(id,r6id,sel) VALUES("' + id + '","' + r6id + '",1)'
                connection.query(exp, function (err: any, result: any) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        exp = 'UPDATE ' + tabname + ' SET r6id=\'' + r6id + '\'WHERE id=' + id;
                        connection.query(exp, function (err: any, result: any) {
                            if (err) {
                                console.log('[INSERT ERROR] - ', err.message);
                            }
                            else {
                                session.send('换绑了ID： ' + r6id);
                                resolve();
                            }
                        })
                    }
                    else {
                        session.send('绑定了ID： ' + r6id);
                        resolve();
                    }
                })
            })
        }
    }
}
export const r6Record = new R6Record();
