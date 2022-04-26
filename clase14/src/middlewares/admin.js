const admin = true;

const validarAdmin = (req, res, next) => {
    if (admin) next();
    else res.status(401).json({
        msg: 'No estas autorizado'
    });
};

module.exports = {
    validarAdmin
}