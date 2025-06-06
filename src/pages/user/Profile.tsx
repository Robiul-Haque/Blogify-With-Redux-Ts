import ProfileForm from '../../components/user/ProfileForm';

const Profile = () => {
    return (
        <section className="flex justify-center items-center">
            <fieldset className="fieldset w-sm bg-base-200 border border-base-300 px-2 pb-8 rounded-box">
                <legend className="fieldset-legend text-xl">Profile Management</legend>
                <ProfileForm />
            </fieldset>
        </section>
    )
}

export default Profile;