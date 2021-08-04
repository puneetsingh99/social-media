export function getFollowButtonCSS({ inFollowersList, hoverState }) {
  return `border border-brand px-4 py-2 rounded-full font-bold text-brand ${
    inFollowersList ? "bg-brand text-white" : "transparent-brand"
  } ${hoverState && inFollowersList && "bg-brandPink border-brandPink"}`;
}
