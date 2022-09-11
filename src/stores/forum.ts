import { defineStore } from 'pinia'
import { subsectionType } from '../types/forumTypes'
import httpModule from '../services/httpModule'

export const useForumStore = defineStore('forum', {
    state: (): {subsections: subsectionType[]} => {
        return {
            subsections: []
        }
    },
    actions: {
        async getSubsections() {
            try {
                const response = await httpModule.get('forum/subsection-list')
                this.$patch({subsections: response.data})
            } catch(error) {
                console.log(error)
            }
        }
    }
})