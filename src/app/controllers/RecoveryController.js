const User = require('../models/Users');
const crypto = require('crypto');

class RecoveryController {
    async store(req, res) {

        const { email } = req.body;

        const user = await User.find({ email });
        if (!user) {
            return res.json({ error: "Usuário não localizado" });
        }

        return req.json()

        //Gera Token
        //Data de expiração
        user.recovery.token = crypto.randomBytes(10).toString('hex');
        user.recovery.date = new Date();
    }



}

module.exports = new RecoveryController()