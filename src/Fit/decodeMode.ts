/**
 * Mode used for Read Operations
 */
export enum DecodeMode {
    /**
     * Indicates that file contains valid Header and CRC data
     */
    Normal,

    /**
     * Indicates that the Stream Contains a Header that is Corrupt
     */
    InvalidHeader,

    /**
     * Indicates that the Stream does not contain a Header or CRC
     */
    DataOnly,
}
