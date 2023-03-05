export default {
    name: 'intersection',
    mounted(el, binding) {
        const options = {
            rootMargin: '0px',
            threshold: 0.7,
        };
        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    binding.value();
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
};
