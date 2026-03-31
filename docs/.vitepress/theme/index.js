import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'
import ExtensionCard from './components/ExtensionCard.vue'
import ExtensionGrid from './components/ExtensionGrid.vue'
import APIPlayground from './components/APIPlayground.vue'
import EndpointBlock from './components/EndpointBlock.vue'
import SchemaViewer from './components/SchemaViewer.vue'
import FundingSourceTable from './components/FundingSourceTable.vue'
import PageToolbar from './components/PageToolbar.vue'
import HomePage from './components/HomePage.vue'
import ExtensionHeader from './components/ExtensionHeader.vue'
import ContributePage from './components/ContributePage.vue'
import NavSwitch from './components/NavSwitch.vue'
import NavChatIcon from './components/NavChatIcon.vue'
import HeroImage from './components/HeroImage.vue'
import DeploymentGrid from './components/DeploymentGrid.vue'
import SkillCard from './components/SkillCard.vue'
import SkillHeader from './components/SkillHeader.vue'
import DocChat from './components/DocChat.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-before': () => h(NavSwitch),
      'nav-bar-content-after': () => h(NavChatIcon),
      'layout-bottom': () => [h(PageToolbar), h(DocChat)],
    })
  },
  enhanceApp({ app }) {
    app.component('ExtensionCard', ExtensionCard)
    app.component('ExtensionGrid', ExtensionGrid)
    app.component('APIPlayground', APIPlayground)
    app.component('EndpointBlock', EndpointBlock)
    app.component('SchemaViewer', SchemaViewer)
    app.component('FundingSourceTable', FundingSourceTable)
    app.component('HomePage', HomePage)
    app.component('ExtensionHeader', ExtensionHeader)
    app.component('ContributePage', ContributePage)
    app.component('HeroImage', HeroImage)
    app.component('DeploymentGrid', DeploymentGrid)
    app.component('SkillCard', SkillCard)
    app.component('SkillHeader', SkillHeader)
  },
}
