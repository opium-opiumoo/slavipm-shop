(function ($, pluginName) {
    // plugin defaults
    const defaults = {
        htmlClass: true
    }

    // plugin constructor
    function Plugin(element, options) {
        this.element = element
        this.eventController = eventController

        // merge defaults with options
        this.options = $.extend({}, defaults, options)
        this.options.initialized = false

        // initialize the plugin
        this.init()
    }

    Plugin.prototype.init = function () {
        const mobileNav = this.element
        const options = this.options
        const eventController = this.eventController.bind(this)

        // exit if already initialized
        if (options.initialized === true) return

        eventController('loading')

        // handle subMenu links/triggers click events
        mobileNav.find('[data-submenu]').on('click', function (event) {
            event.preventDefault()

            const self = $(this)
            const subMenuId = self.attr('data-submenu')
            const subMenuEl = $('#' + subMenuId)

            // if subMenu not found, do nothing
            if (!subMenuEl.length) return

            const eventDetails = {
                subMenu: true,
                menuId: subMenuId
            }

            eventController('opening', eventDetails)

            // open the subMenu
            mobileNav.find('.submenu.current').removeClass('current')
            subMenuEl.addClass('opened current')
            !mobileNav.hasClass('submenu-opened') && mobileNav.addClass('submenu-opened')
            eventController('opened', eventDetails)
            mobileNav.scrollTop(0);
        })

        // handle subMenu closers click events
        mobileNav.find('[data-submenu-close]').on('click', function (event) {
            event.preventDefault()

            const self = $(this)
            const subMenuId = self.attr('data-submenu-close')
            const subMenuEl = $('#' + subMenuId)


            // if subMenu not found, do nothing
            if (!subMenuEl.length) return

            const eventDetails = {
                subMenu: true,
                menuId: subMenuId
            }

            eventController('closing', eventDetails)

            // close subMenu
            subMenuEl.removeClass('opened current')
            mobileNav.find('.submenu.opened:last').addClass('current')
            !mobileNav.find('.submenu.opened').length && mobileNav.removeClass('submenu-opened')

            // scroll to top between submenu transitions
            subMenuEl.scrollTop(0)

            eventController('closed', eventDetails)
        })

        eventController('load')

        // mobileNav successfully initialized
        this.options.htmlClass && !$('html').hasClass('mobileNav-initialized') && $('html').addClass('mobileNav-initialized')

        options.initialized = true
    }

    Plugin.prototype.open = function () {
        this.eventController(
            'opening',
            { subMenu: false }
        )

        // mobileNav menu is opened
        this.element.addClass('opened')
        this.options.htmlClass && $('html').addClass('mobileNav-opened')
        $(".mobile-nav-menu-overlay").show();
        $(".menu-btn.hamburger").addClass("close");
        $("body").addClass("disable-scroll");

        this.eventController(
            'opened',
            { subMenu: false }
        )
    }

    Plugin.prototype.close = function (disableEvent) {
        !disableEvent && this.eventController('closing', { subMenu: false })

        // mobileNav menu is opened
        this.element.removeClass('opened')
        this.options.htmlClass && $('html').removeClass('mobileNav-opened')
        $(".mobile-nav-menu-overlay").hide();
        $(".menu-btn.hamburger").removeClass("close");
      
        //header transparent
        if ($(window).scrollTop() < 32) {
          $('header.addHomepage').addClass('isHomepage');
        }


        // Close all opened dropdowns
        document.querySelectorAll(".accordion").forEach(dropdown => {
            dropdown.classList.remove("open")
            dropdown.querySelector('.indicator').classList.remove("opened-dropdown")
            $(".submenu-accordion").slideUp(200);
            $("body").removeClass("disable-scroll")


        })

        // Close all submenus
        document.querySelectorAll(".submenu").forEach(submenu => {
            submenu.classList.remove("opened", "current")
        })

        !disableEvent && this.eventController('closed', { subMenu: false })
    }

    Plugin.prototype.destroy = function () {
        this.eventController('destroying')

        // close the menu without firing any event
        this.close(true)

        // close submenus
        this.element.find('.submenu.opened').removeClass('opened')

        // clear/remove the instance on the element
        this.element.removeData(pluginName)

        this.eventController('destroyed')

        // reset options
        this.options = defaults

        this.options.htmlClass && $('html').removeClass('mobileNav-initialized')

        delete this.element
        delete this.options
        delete this.eventController
    }

    Plugin.prototype.on = function (name, handler) {
        eventBinder.call(this, name, handler)
    }

    const eventController = function (type, details) {
        // validations
        if (!this.options[type]) return
        if (typeof this.options[type] !== 'function') throw Error('event handler must be a function: ' + type)

        // call the event
        this.options[type].call(this, this.element, this.options, details)
    }

    const getInstance = function (element, options) {
        let instance = null

        if (!element.data(pluginName)) {
            // mobileNav is not initialized for the element
            // crceate a new instance
            instance = new Plugin(element, options || {})

            // put the instance on element
            element.data(pluginName, instance)
        } else {
            // return the already initialized instance
            instance = element.data(pluginName)
        }

        return instance
    }

    const eventBinder = function (name, handler) {
        // validations
        if (typeof name !== 'string') throw Error('event name is expected to be a string but got: ' + typeof name)
        if (typeof handler !== 'function') throw Error('event handler is not a function for: ' + name)

        // update options
        this.options[name] = handler
    }

    // a really lightweight plugin wrapper around the constructor
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        // get a mobileNav instance
        const instance = getInstance($(this[0]), options)

        // return the instance
        return instance
    }
})(window.jQuery, 'mobileNav')

/** 
 * Dropdown Accordion
*/
$(function () {
    const Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Private variables
        const links = this.el.find('.link');

        // Event
        links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
    }

    Accordion.prototype.dropdown = function (e) {
        const $el = e.data.el;
        $this = $(this),
            $next = $this.next();


        $next.slideToggle(200);
        $this.parent().toggleClass('open');
        $this.find(".vertical").parent().toggleClass("opened-dropdown")

        if (!e.data.multiple) {
            $el.find('.submenu-accordion').not($next).slideUp(200).parent().removeClass('open');

        };
        const allAccordions = document.querySelectorAll(".accordion");
        allAccordions.forEach(accordion => {
            if (accordion.classList.contains("open")) {
                return
            }
            else {
                accordion.querySelector('.indicator').classList.remove("opened-dropdown")
            }
        })
    }
    const accordion = new Accordion($('.accordion'), false);
});