export default function GetAllCommentsByPhotoIdFunction({comment}) {
  function convertDate(date) {
    const splitData = date.split(' ')
    // console.log('regular date = ', date)
    // console.log('splitData = ', splitData)
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }
if (comment && comment["Author"] == undefined) return <></>
console.log('Comment, get all comments', comment)
if (!Object.values(comment).length) {
  return (
    <>
      <p>Be the first to comment!</p>
    </>
  )
} else {
  return (
    <div>
          <p>{comment?.comment}</p>
          <div>
            <p>{comment?.Author?.username}</p>
            <p>{convertDate(comment?.createdAt)}</p>
          </div>
    </div>
  )
}




}
