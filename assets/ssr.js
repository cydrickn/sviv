import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

/**
 * Imports the given page component from the page record.
 */
function resolvePageComponent(name, pages) {
    for (const path in pages) {
        if (path.endsWith(`${name.replace('.', '/')}.vue`)) {
            return typeof pages[path] === 'function'
                ? pages[path]()
                : pages[path]
        }
    }

    throw new Error(`Page not found: ${name}`)
}


export function render(page) {
    return createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => {
            // console.log(page, typeof page);
            return resolvePageComponent(name, import.meta.glob('./pages/**/*.vue', { eager: true }))
        },
        setup({ el, App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
        },
    })
}
