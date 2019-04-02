import * as types from './mutation-types'
// export const deleteSongList = function ({commit}) {
//     commit(types.SET_CURRENT_INDEX, -1)
//     commit(types.SET_PLAYLIST, [])
//     commit(types.SET_SEQUENCE_LIST, [])
//     commit(types.SET_PLAYING_STATE, false)
//   }
  
// export const deleteSong = function ({commit, state}, song) {
//     let playlist = state.playlist.slice()
//     let sequenceList = state.sequenceList.slice()
//     let currentIndex = state.currentIndex
//     let pIndex = findIndex(playlist, song)
//     playlist.splice(pIndex, 1)
//     let sIndex = findIndex(sequenceList, song)
//     sequenceList.splice(sIndex, 1)
//     if (currentIndex > pIndex || currentIndex === playlist.length) {
//       currentIndex--
//     }
  
//     commit(types.SET_PLAYLIST, playlist)
//     commit(types.SET_SEQUENCE_LIST, sequenceList)
//     commit(types.SET_CURRENT_INDEX, currentIndex)
  
//     if (!playlist.length) {
//       commit(types.SET_PLAYING_STATE, false)
//     } else {
//       commit(types.SET_PLAYING_STATE, true)
//     }
//   }