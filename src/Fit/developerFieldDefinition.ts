import { FieldDescriptionMesg } from "./Profile/Mesgs/fieldDescriptionMesg";

export class DeveloperFieldDefinition {
  /**
   *
   * @param descriptionMesg
   * @param size Size (in bytes) of the specified FIT message’s field
   */
  public constructor(
    public descriptionMesg: FieldDescriptionMesg,
    public size: number
  ) {}
}
