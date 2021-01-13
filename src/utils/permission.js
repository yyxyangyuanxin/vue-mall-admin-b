import router from "../router";

const roleToRouter = {
        coustomer: [{
                name: 'Product'
            }, {
                name: 'ProductList'
            }, {
                name: 'ProductAdd'
            },
            {
                name: 'ProductEdit'
            }
        ],
        admin: [{
            name: 'Product'
        }, {
            name: 'ProductList'
        }, {
            name: 'ProductAdd'
        }, {
            name: 'ProductEdit'
        }, {
            name: 'Category'
        }]
    }
    /**
     * 过滤没有权限的路由
     * @param {String} role 
     * @param {Array} routes 
     */
export default function getMenuRouter(role, routes) {
    const allowRoutesName = roleToRouter[role].map(item => item.name);
    const resultRoutes = routes.filter(r => {
        if (allowRoutesName.indexOf(r.name) !== -1) {
            const { children } = r;
            r.children = children.filter(c => allowRoutesName.indexOf(c.name) !== -1)
            return true;
        }
        return false;
    })
    return resultRoutes;
}