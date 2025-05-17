import { Button } from "@/components/Buttons";
import UserPageNavCard from "@/components/cards/UserPageNavCard";
import useAuth from "@/hooks/useAuth";
import styles from '@/styles/cards/usrpgdtls.module.css';
import { formatDate } from "@/utils/common";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

export default function UserPageDetailsCard({
  id, fullname, username, gravatar, bio, createdAt, numFollowers, numFollowing, numPosts
}) {
  const { userDetails } = useAuth();
  const canEdit = userDetails.id == id;

  const title = fullname;
  const subtitle = `${numPosts} post${numPosts===1 ? '' : 's'}`

  return (
    <div className={styles.prfDtlsCntr}>
      <UserPageNavCard title={title} subtitle={subtitle} />
      <div className={styles.bkgrdImg}></div>
      <div>
        <div className={styles.prfImgHldr}>
          <div className={styles.prfImgCntr}>
            <Image src={gravatar || `https://robohash.org/${id}.png`}
              width={120} height={120} alt={`${username} profile photo`} />
          </div>
        </div>
        <div className={styles.prfSummary}>
          <div className={styles.prfEditbtn}>
            {canEdit && <Button style={{ padding: '0.25em 0.7em', borderRadius: '1em', marginLeft: 'auto' }} variant={'outline'}>Edit Profile</Button>}
          </div>
          <div className={styles.names}>
            <h3>{fullname}</h3>
            <div>@{username}</div>
          </div>
          <div>{bio}</div>
          <div className={styles.locationTimeline}>
            <div><IoLocationOutline /> OdinLand</div>
            <div><FaRegCalendarAlt /> {formatDate(createdAt)}</div>
          </div>
          <div className={styles.friends}>
            <Link href={`/${id}/following`}><span>{numFollowing}</span> Following</Link>
            <Link href={`/${id}/followers`}><span>{numFollowers}</span> Followers</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
