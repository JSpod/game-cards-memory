class TemplateManager {
    constructor() {
        if (!('content' in document.createElement('template'))) {
            out.logError('Your browser does not support templates.');
            return;
        }
    }

    getTemplate(fileName, templateId, cb) {
        if (!fileName) {
            out.logError('No file name specified for template.');
            return;
        }

        if (!templateId) {
            out.logError('No template id specified for template.');
            return;
        }

        if (!fileName.endsWith('.html')) {
            fileName += '.html';
        }

        if (!templateId.startsWith('#')) {
            templateId = '#' + templateId;
        }

        fetch(`templates/${fileName}`)
            .then(response => {
                if (!response.ok) {
                    out.logError(`template file '${fileName}' not found`);
                    return;
                }
                return response.text();
            })
            .then(html => {
                const template = this.createTemplate(html);
                const element = template.querySelector(templateId);
                if (!element) {
                    out.logError(`template id '${templateId}' not found in template file '${fileName}'`);
                    return;
                }
                cb(element.content.cloneNode(true));
            })
            .catch(err => {
                out.logError(`Failed to load template "${fileName}": ${err.message}`);
            });
    }

    createTemplate(html) {
        const template = document.createElement('template');
        template.appendChild(document.createRange().createContextualFragment(html));
        return template;
    }

    renderTemplate(container, templateName, templateId, cb) {
        const template = app.templates[templateName];

        if (template) {
            // if template is already rendered - just clone it
            container.appendChild(app.templates[templateName].cloneNode(true));
            return;
        }

        this.getTemplate(templateName, templateId, (template) => {
            // if template is not rendered - render it and save to app.templates
            container.appendChild(template.cloneNode(true));
            app.templates[templateName] = template;

            if (cb) cb();
        });

    }

}

export const templateManager = new TemplateManager();