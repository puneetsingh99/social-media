export function getFollowButtonText({
  isLoggedInUser,
  inFollowersList,
  hoverState,
}) {
  if (isLoggedInUser) {
    return "Edit profile";
  }

  if (inFollowersList) {
    return hoverState ? "Unfollow" : "Following";
  }

  return "Follow";
}
