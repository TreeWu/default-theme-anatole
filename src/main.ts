import "./css/tailwind.css"
import "./libs/github-markdown-css/github-markdown-light.css"
import "./css/style.scss"
import '@purge-icons/generated'

import Alpine from 'alpinejs'

// @ts-ignore
window.Alpine = Alpine

Alpine.start()


document.addEventListener("DOMContentLoaded", () => {

    const href = location.href; // http://localhost:8090/
    const pathname = location.pathname; // /
    const origin = location.origin; // http://localhost:8090
    const menuNodes = document.querySelectorAll(".nav .nav-item a")

    const menuNodesArray = Array.from(menuNodes)

    const homeMenu = menuNodesArray.find(node => {
        return [href, pathname, origin].includes(node.getAttribute("href") || '')
    })

    if (homeMenu) {
        homeMenu.parentElement?.classList.add("current")
        return
    }

    menuNodes.forEach(node => {
        const currentHref = node.getAttribute("href")

        if (!currentHref) {
            return
        }

        if ([href, pathname].includes(currentHref)) {
            console.log(node)
            node.parentElement?.classList.add("current")
            return
        }
    })

})

let nav = document.getElementById("post-navigation-wrapper");
if (nav) {
    // 监听 post-page 的变化，动态调整 post-page 的位置
    let content = document.getElementById("post-content");
    if (content) {

        let children = content.children;
        // 获取所有tag为 h1-h6 的元素，并生成导航 添加到 #post-navigation
        for (let i = 0; i < children.length; i++) {

            let child = children[i];
            let tagName = child.tagName;
            if (tagName === "H1" || tagName === "H2" || tagName === "H3" || tagName === "H4" || tagName === "H5" || tagName === "H6") {
                let id = child.id;

                let li = document.createElement(tagName);
                let a = document.createElement("a");
                a.setAttribute("href", "#" + id);
                a.innerText = child.innerHTML;
                li.appendChild(a);
                nav?.appendChild(li);
            }
        }
    }
}


