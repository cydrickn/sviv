import { createApp, h } from 'vue'
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

// Creates the Inertia app, nothing fancy.
createInertiaApp({
    resolve: (name) => resolvePageComponent(name, import.meta.glob('./pages/**/*.vue')),
    setup({ el, app, props, plugin }) {
        createApp({ render: () => h(app, props) })
            .use(plugin)
            .mount(el)
    },
})

