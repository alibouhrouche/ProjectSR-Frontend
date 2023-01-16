import { Ability, AbilityBuilder } from '@casl/ability';

export default function defineAbilityFor(user:string[]) {
    const { can, build } = new AbilityBuilder(Ability);
  
    if (user.includes("ADMIN")) {
      can('manage', 'all'); // read-write access to everything
    }
    if (user.includes("CLIENT")) {
      can('list', ['messages','mymessages','terrain','sports']) // read-only access to everything
      can(['create','show'], ['messages'])
      can('manage', ['mymessages'])
    }

    return build();
}